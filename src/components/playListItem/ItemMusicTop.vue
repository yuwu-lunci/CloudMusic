<template>
    <div class="itemMusicTop">
        <img :src="topData.creator.backgroundUrl" alt="" class="bgImg">
        <div class="itemTop">
            <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou-copy"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-dian"></use>
            </svg>
        </div>
        </div>

        <div class="center">
            <img :src="topData.coverImgUrl" alt="">
            <div class="centerRight">
                <span class="crTop">{{topData.name}}</span>
                <span class="crMiddle">
                    <img :src="topData.creator.avatarUrl" alt="">
                    {{topData.creator.nickname}}
                </span>
                <span class="crBottom">{{topData.name}}</span>
            </div>
        </div>

        <div class="bottom">
            <div><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_pinglun-copy"></use>
            </svg>
            <span>18</span>
            </div>
            <div><svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-fenxiang-copy"></use>
            </svg>
            <span>18</span>
            </div>
            <div><svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-xiazai-copy"></use>
            </svg>
            <span>下载</span>
            </div>
            <div><svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-duoxuan-02-copy"></use>
            </svg>
            <span>多选</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CloudMusicItemMusicTop',

    props:['topData'],
    setup(props) {
        // console.log(props);
        //通过props取值，如果没有，则从session中获取
        if (props.topData.creator="") {
            props.topData.creator=JSON.parse(sessionStorage.getItem().itemDetail).creator
        }
    }
};
</script>

<style lang="less" scoped>
    .itemMusicTop{
        width: 100%;
        height: 280px;
        .itemTop{
        position: relative;
        width: 100%;
        height: 50px;
        display: flex;
        // padding: .2rem;
        justify-content: space-between;
        .itemLeft,.itemRight{
            width: 25%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                font-size: 20px;
                color: white;
            }
            .icon{
                // 填充颜色
                fill: white;
                width: 22px;
                height: 22px;
            }
        }

        }
        .bgImg{
            width: 100%;
            height: 6rem;
            //让图片脱离文档流
            position: fixed;
            z-index: -1;
            //图片虚化
            filter: blur(.6rem);
        }
        .center{
            width: 100%;
            height: 140px;
            display: flex;
            justify-content: space-around;
            img{
                margin-top: 10px;
                width: 120px;
                height: 120px;
                border-radius: 5px;
            }
            .centerRight{
                width: 60%;
                display: flex;
                flex-flow: column;
                justify-content: space-around;
                .crTop{
                    color:white;
                    font-size: 16px;
                }
                .crMiddle{
                    width: 60%;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    img{
                        width: 25px;
                        height: 25px;
                        border-radius: 12.5px;
                        margin-bottom: 5px;
                        margin-right: 5px;
                    }
                }
                .crBottom{
                    color:#ccc;
                    font-size: 12px;
                }
            }
        }

        .bottom{
            height: 60px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            div{
                display: flex;
                justify-content: space-around;
                flex-flow: column;
                align-items: center;
                .icon{
                    width: 30px;
                    height: 30px;
                }
                span{
                    font-size: 14px;
                }
            }
        }
    }
</style>