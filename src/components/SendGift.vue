<template>
    <div class="live-page">
        <div ref="page" class="gift-container"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Dom from "../utils/Dom.js";

const avatarList = [
    'https://dy.ttentau.top/images/EPsQ7u4sNnrHC-ix-a9yQ.png',
    'https://dy.ttentau.top/images/Xex2IhY-Zm338cNlcGuNW.png',
    'https://dy.ttentau.top/images/gddHyRZrdk0Em3RRgVa9g.png',
    'https://dy.ttentau.top/images/LJ-8p2jF3HydBD5j28PgQ.png',
    'https://dy.ttentau.top/images/KwJ9N7yFjYylfwYeThWjx.png',
    'https://dy.ttentau.top/images/EKkC06GI4yXC2mNHMrm46.png',
    'https://dy.ttentau.top/images/rlkpmpGPdhYZRJl3J4Xl7.png',
    'https://dy.ttentau.top/images/Ge4mMWQoICdpyTyixk3Sf.png'
];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendGiftTemplate() {
    const avatar = avatarList[random(0, avatarList.length - 1)];
    const gift = 'https://dy.ttentau.top/images/icon/love.webp';
    const name = '观众';
    const name2 = '主播';
    const num = '123';

    return `
    <div class="send-gift">
      <div class="left">
        <img src="${avatar}" alt="" class="avatar">
        <div class="desc">
          <div class="name">${name}</div>
          <div class="sendto">
            <span class="send">送</span>
            <span class="to">${name2}</span>
          </div>
        </div>
        <div class="gift-wrapper">
          <img src="${gift}" alt="" class="gift-icon">
        </div>
      </div>
      <div class="right">
        x${num}
      </div>
    </div>
  `;
}

const page = ref(null);

function sendGift() {
    const pageDom = new Dom(page.value);
    const sendGiftDom = new Dom().create(sendGiftTemplate());
    sendGiftDom.on('animationend', () => {
        sendGiftDom.remove();
    });
    const oldSendGift = new Dom('.send-gift');
    let top = document.body.clientHeight * 0.6;
    if (oldSendGift.els.length !== 0) {
        top = sendGiftDom.removePx(oldSendGift.css('top')) - 70;
    }
    if (top < 100) {
        top = document.body.clientHeight * 0.6;
    }
    console.log('top', top);
    sendGiftDom.css('top', top);
    pageDom.append(sendGiftDom);
}

setInterval(() => {
    sendGift();
}, 400);

onMounted(() => {
    // Add a method to send a gift manually for testing purposes
    window.sendGift = sendGift;
});
</script>

<style lang="less">
@import './../../src/asset/css/index.less';

.send-gift {
    position: fixed;
    top: 63vh;
    left: 15rem;
    display: flex;
    align-items: flex-end;
    animation: send-gift-anim 2s linear;

    @keyframes send-gift-anim {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        10% {
            opacity: 1;
            transform: translateX(0);
        }
        80% {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(0);
        }
    }

    .left {
        background: linear-gradient(to right, var(--primary-btn-color), rgba(252, 47, 86, 0.2));
        padding: 5rem;
        border-radius: 50rem;
        display: flex;
        align-items: center;

        .avatar {
            margin-right: 5rem;
            width: 40rem;
            height: 40rem;
            object-fit: cover;
            border-radius: 50%;
        }

        .desc {
            width: 20vw;

            .name,
            .sendto {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .name {
                font-size: 14rem;
            }

            .sendto {
                font-size: 12rem;
                color: yellow;
            }

            .to {
                color: yellow;
            }
        }

        .gift-icon {
            width: 40rem;
        }
    }

    .right {
        font-size: 23rem;
        font-weight: bold;
        font-style: oblique;
        color: crimson;
    }
}

.barrage {
    position: fixed;
    top: 50%;
    transform: translateX(100%);
    display: flex;
    align-items: center;
    font-size: 12rem;
    animation: anim 5s linear;

    @keyframes anim {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }

    .type {
        padding: 1rem 6rem;
        border: 1px solid white;
        border-radius: 20rem;
        margin-right: 5rem;
    }
}

.user-joined {
    @tag-bg: rgba(58, 58, 70, 0.3);
    font-size: 12rem;
    position: absolute;
    top: 70vh;
    left: 15rem;
    padding: 4rem 8rem;
    border-radius: 20rem;
    background: rgba(115, 114, 181, 0.7);
    margin-bottom: 5rem;
    animation: user-joined-anim 3s linear;

    @keyframes user-joined-anim {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        10% {
            opacity: 1;
            transform: translateX(30rem);
        }
        90% {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 1;
            transform: translateX(-100%);
        }
    }

    @text-color: rgb(164, 234, 253);

    .level {
        display: inline-block;

        .wrapper {
            display: flex;
            @color: rgb(130, 133, 185);
            align-items: center;
            font-size: 10rem;
            border-radius: 10rem;
            margin-right: 5rem;
            padding: 0 6rem;
            background: @color;

            img {
                margin-right: 3rem;
                width: 12rem;
            }
        }
    }

    .name {
        margin-right: 5rem;
        font-size: 13rem;
        color: @text-color;
    }

    .text {
        word-break: break-all;
    }
}
</style>

