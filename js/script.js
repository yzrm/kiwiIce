const container = document.querySelector('.timelineList');
const slides = document.querySelectorAll('.timelineListContent');
const containerWidth = container.offsetWidth;
gsap.to( slides, { // slidesに対して以下のアニメーションを設定
   xPercent: -110 * (slides.length - 1), // 横に動く方向と距離（この例は右側にスライドの合計幅より少し横スクロール）
   ease: "none", //アニメーションの種類をnoneにする
   scrollTrigger: {
      trigger: container, //containerに到達したら発火
      pin: true, // ピン留をtrueにすることでcontainerの縦スクロールが止まる
      scrub: 1, //スクロール当たりのアニメーションが動く時間
      end: containerWidth, // 横スクロールが終わる地点
      anticipatePin: 1, // ピン留のタイミング
      invalidateOnRefresh: true, // リサイズ時の調整でtrueにしておく
  }
})