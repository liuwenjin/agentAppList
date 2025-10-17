<template>
  <div class="tw-h-screen tw-bg-black tw-flex tw-flex-col tw-text-white">
    <header
      class="tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between tw-bg-gray-900/70 tw-border-b tw-border-gray-800"
    >
      <div class="tw-flex tw-flex-col tw-gap-1">
        <h1 class="tw-text-lg tw-font-semibold">Mini Mario</h1>
        <p class="tw-text-xs tw-text-gray-400">
          收集金币、避开障碍并触碰旗帜以完成关卡。
        </p>
      </div>
      <div class="tw-flex tw-items-center tw-gap-6 tw-text-sm">
        <span>得分：<strong>{{ accountData.score }}</strong></span>
        <span>剩余金币：<strong>{{ accountData.coins.length }}</strong></span>
      </div>
    </header>

    <div
      ref="gameCanvas"
      class="tw-flex-1 tw-relative tw-overflow-hidden tw-m-6 tw-rounded-xl tw-border tw-border-gray-800 tw-bg-gradient-to-b tw-from-gray-900 tw-via-black tw-to-gray-950"
      :style="worldStyle"
      role="application"
      aria-label="极简超级马里奥"
    >
      <transition name="fade">
        <div
          v-if="statusMessage"
          class="tw-absolute tw-inset-0 tw-z-20 tw-bg-black/70 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-text-center tw-p-6"
        >
          <div>
            <p class="tw-text-2xl tw-font-bold">{{ statusMessage.title }}</p>
            <p class="tw-text-sm tw-text-gray-200 tw-mt-1">
              {{ statusMessage.subtitle }}
            </p>
          </div>
          <el-button type="primary" size="small" @click="resetGame">重新开始</el-button>
        </div>
      </transition>

      <div
        v-if="accountData"
        class="tw-absolute tw-transition-transform tw-duration-75 tw-ease-linear tw-will-change-transform tw-rounded"
        :style="marioStyle"
        aria-label="马里奥"
      ></div>

      <div
        v-for="coin in accountData.coins"
        :key="coin.id"
        class="tw-absolute tw-bg-yellow-400 tw-rounded-full tw-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
        :style="coinStyle(coin)"
        aria-hidden="true"
      ></div>

      <div
        v-for="obstacle in accountData.obstacles"
        :key="obstacle.id"
        class="tw-absolute tw-bg-gray-200 tw-rounded tw-shadow-inner tw-shadow-black/60"
        :style="obstacleStyle(obstacle)"
        aria-hidden="true"
      ></div>

      <div v-if="accountData.flag" class="tw-absolute tw-flex tw-items-center tw-flex-col tw-gap-1" :style="flagStyle">
        <div class="tw-w-1 tw-h-20 tw-bg-red-500 tw-rounded-t"></div>
        <div class="tw-w-3 tw-h-3 tw-bg-white tw-rounded-full"></div>
      </div>

      <div class="tw-absolute tw-bottom-3 tw-left-3 tw-text-[11px] tw-text-gray-400 tw-bg-black/40 tw-px-3 tw-py-1 tw-rounded-full">
        方向键 / 下方按钮控制移动与跳跃
      </div>
    </div>

    <footer class="tw-p-4 tw-flex tw-justify-center tw-gap-6 tw-bg-gray-900 tw-border-t tw-border-gray-800">
      <el-button
        text
        class="tw-text-white"
        @mousedown="pressKey('ArrowLeft')"
        @mouseup="releaseKey('ArrowLeft')"
        @mouseleave="releaseKey('ArrowLeft')"
        @touchstart.prevent="pressKey('ArrowLeft')"
        @touchend="releaseKey('ArrowLeft')"
        @click.prevent="nudge('ArrowLeft')"
      >
        <i class="bi bi-arrow-left"></i>
      </el-button>
      <el-button
        text
        class="tw-text-white"
        @mousedown="pressKey('ArrowUp')"
        @mouseup="releaseKey('ArrowUp')"
        @mouseleave="releaseKey('ArrowUp')"
        @touchstart.prevent="pressKey('ArrowUp')"
        @touchend="releaseKey('ArrowUp')"
        @click.prevent="nudge('ArrowUp')"
      >
        <i class="bi bi-arrow-up"></i>
      </el-button>
      <el-button
        text
        class="tw-text-white"
        @mousedown="pressKey('ArrowRight')"
        @mouseup="releaseKey('ArrowRight')"
        @mouseleave="releaseKey('ArrowRight')"
        @touchstart.prevent="pressKey('ArrowRight')"
        @touchend="releaseKey('ArrowRight')"
        @click.prevent="nudge('ArrowRight')"
      >
        <i class="bi bi-arrow-right"></i>
      </el-button>
    </footer>
  </div>
</template>

<script>
const WORLD_CONFIG = {
  width: 800,
  groundLevel: 470,
  gravity: 0.9,
  moveSpeed: 5,
  jumpStrength: 16,
  terminalVelocity: 20
};

const createInitialState = () => ({
  mario: {
    x: 50,
    y: WORLD_CONFIG.groundLevel,
    width: 20,
    height: 30,
    velocityY: 0,
    onGround: true
  },
  coins: [
    { id: 1, x: 200, y: 380 },
    { id: 2, x: 350, y: 320 },
    { id: 3, x: 500, y: 380 }
  ],
  obstacles: [
    { id: 1, x: 250, y: 430, width: 60, height: 30 },
    { id: 2, x: 420, y: 410, width: 40, height: 50 }
  ],
  flag: { x: 700, y: 300, width: 4, height: 80 },
  score: 0,
  gameOver: false,
  gameWon: false
});

export default {
  name: 'SuperMarioMini',
  data() {
    return {
      accountData: createInitialState(),
      pressedKeys: new Set(),
      animationFrameId: null,
      lastTimestamp: null,
      coinSize: 12
    };
  },
  computed: {
    marioStyle() {
      const { mario } = this.accountData;
      return {
        width: `${mario.width}px`,
        height: `${mario.height}px`,
        left: '0px',
        top: '0px',
        transform: `translate(${mario.x}px, ${mario.y}px)`,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(148,163,184,0.95) 100%)',
        boxShadow: '0 6px 12px rgba(15,23,42,0.45)'
      };
    },
    worldStyle() {
      return {
        width: `${WORLD_CONFIG.width}px`,
        height: `${WORLD_CONFIG.groundLevel + 70}px`
      };
    },
    flagStyle() {
      const { flag } = this.accountData;
      return {
        left: '0px',
        top: '0px',
        transform: `translate(${flag.x}px, ${flag.y}px)`
      };
    },
    statusMessage() {
      if (this.accountData.gameWon) {
        return {
          title: '恭喜过关！',
          subtitle: `你以 ${this.accountData.score} 分的成绩完成了挑战。`
        };
      }
      if (this.accountData.gameOver) {
        return {
          title: 'Game Over',
          subtitle: '你撞到了障碍物，再试一次吧！'
        };
      }
      return null;
    }
  },
  mounted() {
    this.startGameLoop();
    window.addEventListener('keydown', this.handleKeyDown, { passive: false });
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeUnmount() {
    this.stopGameLoop();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  },
  methods: {
    startGameLoop() {
      if (this.animationFrameId) return;
      const loop = (timestamp) => {
        this.animationFrameId = window.requestAnimationFrame(loop);
        this.updateGame(timestamp);
      };
      this.animationFrameId = window.requestAnimationFrame(loop);
    },
    stopGameLoop() {
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    },
    updateGame(timestamp) {
      if (!this.accountData || this.accountData.gameOver || this.accountData.gameWon) {
        this.lastTimestamp = timestamp;
        return;
      }
      if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
      }
      const deltaFrames = Math.max(1, Math.round((timestamp - this.lastTimestamp) / 16));
      this.lastTimestamp = timestamp;

      for (let i = 0; i < deltaFrames; i += 1) {
        this.updateMarioPosition();
        this.checkCollisions();
      }
    },
    updateMarioPosition() {
      const { mario } = this.accountData;
      const previousX = mario.x;
      const previousY = mario.y;

      if (this.isKeyActive('ArrowLeft')) {
        this.moveHorizontally(-WORLD_CONFIG.moveSpeed);
      }
      if (this.isKeyActive('ArrowRight')) {
        this.moveHorizontally(WORLD_CONFIG.moveSpeed);
      }

      mario.velocityY = Math.min(
        mario.velocityY + WORLD_CONFIG.gravity,
        WORLD_CONFIG.terminalVelocity
      );
      mario.y += mario.velocityY;
      mario.onGround = false;

      if (mario.y >= WORLD_CONFIG.groundLevel) {
        mario.y = WORLD_CONFIG.groundLevel;
        mario.velocityY = 0;
        mario.onGround = true;
      }

      const marioRect = this.getMarioRect();
      for (const obstacle of this.accountData.obstacles) {
        const obstacleRect = this.getObstacleRect(obstacle);
        if (!this.isIntersecting(marioRect, obstacleRect)) continue;

        const collidedFromTop = previousY + mario.height <= obstacleRect.y;
        const collidedFromBottom = previousY >= obstacleRect.y + obstacleRect.height;
        const collidedFromLeft = previousX + mario.width <= obstacleRect.x;
        const collidedFromRight = previousX >= obstacleRect.x + obstacleRect.width;

        if (collidedFromTop && mario.velocityY >= 0) {
          mario.y = obstacleRect.y - mario.height;
          mario.velocityY = 0;
          mario.onGround = true;
          marioRect.y = mario.y;
        } else {
          if (collidedFromBottom && mario.velocityY <= 0) {
            mario.y = obstacleRect.y + obstacleRect.height;
            mario.velocityY = 0.5;
            marioRect.y = mario.y;
          } else if (collidedFromLeft) {
            mario.x = obstacleRect.x - mario.width;
            marioRect.x = mario.x;
          } else if (collidedFromRight) {
            mario.x = obstacleRect.x + obstacleRect.width;
            marioRect.x = mario.x;
          }
          this.accountData.gameOver = true;
          break;
        }
      }

      if (this.accountData.gameOver) {
        return;
      }

      mario.x = this.clamp(mario.x, 0, WORLD_CONFIG.width - mario.width);
    },
    checkCollisions() {
      if (this.accountData.gameOver || this.accountData.gameWon) {
        return;
      }

      const { mario } = this.accountData;
      const marioRect = this.getMarioRect();

      for (let i = this.accountData.coins.length - 1; i >= 0; i -= 1) {
        const coin = this.accountData.coins[i];
        const coinRect = this.getCoinRect(coin);
        if (this.isIntersecting(marioRect, coinRect)) {
          this.accountData.coins.splice(i, 1);
          this.accountData.score += 100;
        }
      }

      const { flag } = this.accountData;
      if (!flag) return;
      const flagRect = this.getFlagRect(flag);
      if (this.isIntersecting(marioRect, flagRect)) {
        if (this.accountData.coins.length === 0) {
          this.accountData.gameWon = true;
        } else {
          this.accountData.score += 10;
        }
      }
    },
    moveHorizontally(distance) {
      if (this.accountData.gameOver || this.accountData.gameWon) return;
      const { mario } = this.accountData;
      const previousX = mario.x;
      mario.x = this.clamp(mario.x + distance, 0, WORLD_CONFIG.width - mario.width);

      const marioRect = this.getMarioRect();
      for (const obstacle of this.accountData.obstacles) {
        const obstacleRect = this.getObstacleRect(obstacle);
        if (!this.isIntersecting(marioRect, obstacleRect)) continue;

        if (distance > 0) {
          mario.x = obstacleRect.x - mario.width;
          marioRect.x = mario.x;
        } else if (distance < 0) {
          mario.x = obstacleRect.x + obstacleRect.width;
          marioRect.x = mario.x;
        }
      }

      if (previousX !== mario.x) {
        this.accountData.score = Math.max(0, this.accountData.score);
      }
    },
    jump() {
      const { mario } = this.accountData;
      if (!mario.onGround || this.accountData.gameOver || this.accountData.gameWon) return;
      mario.velocityY = -WORLD_CONFIG.jumpStrength;
      mario.onGround = false;
    },
    handleKeyDown(event) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(event.key)) return;
      event.preventDefault();
      const normalizedKey = event.key === ' ' ? 'ArrowUp' : event.key;
      this.pressKey(normalizedKey);
      if (normalizedKey === 'ArrowUp') {
        this.jump();
      }
    },
    handleKeyUp(event) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(event.key)) return;
      const normalizedKey = event.key === ' ' ? 'ArrowUp' : event.key;
      this.releaseKey(normalizedKey);
    },
    pressKey(key) {
      if (this.accountData.gameOver || this.accountData.gameWon) return;
      this.pressedKeys.add(key);
      if (key === 'ArrowUp') {
        this.jump();
      }
    },
    releaseKey(key) {
      this.pressedKeys.delete(key);
    },
    nudge(key) {
      if (key === 'ArrowLeft') {
        this.moveHorizontally(-WORLD_CONFIG.moveSpeed * 2);
      } else if (key === 'ArrowRight') {
        this.moveHorizontally(WORLD_CONFIG.moveSpeed * 2);
      } else if (key === 'ArrowUp') {
        this.jump();
      }
    },
    isKeyActive(key) {
      return this.pressedKeys.has(key);
    },
    resetGame() {
      this.accountData = createInitialState();
      this.pressedKeys.clear();
      this.lastTimestamp = null;
    },
    getMarioRect() {
      const { mario } = this.accountData;
      return {
        x: mario.x,
        y: mario.y,
        width: mario.width,
        height: mario.height
      };
    },
    getCoinRect(coin) {
      const radius = this.coinSize;
      return {
        x: coin.x,
        y: coin.y,
        width: radius,
        height: radius
      };
    },
    getObstacleRect(obstacle) {
      return {
        x: obstacle.x,
        y: obstacle.y,
        width: obstacle.width,
        height: obstacle.height
      };
    },
    getFlagRect(flag) {
      return {
        x: flag.x,
        y: flag.y,
        width: flag.width,
        height: flag.height
      };
    },
    isIntersecting(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    },
    clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    },
    coinStyle(coin) {
      return {
        left: '0px',
        top: '0px',
        transform: `translate(${coin.x}px, ${coin.y}px)`,
        width: `${this.coinSize}px`,
        height: `${this.coinSize}px`
      };
    },
    obstacleStyle(obstacle) {
      return {
        left: '0px',
        top: '0px',
        transform: `translate(${obstacle.x}px, ${obstacle.y}px)`,
        width: `${obstacle.width}px`,
        height: `${obstacle.height}px`
      };
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
