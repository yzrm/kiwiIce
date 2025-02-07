'use strict';

//ローディング画面制御
const loading = document.querySelector(".loading");

//ページの読み込み完了時に処理を実行
window.addEventListener("load", () => {
   //3秒後にローディング画面を非表示にする
  setTimeout(() => {
    loading.classList.add("loaded");
  }, 3000);
});

//
//スクロールアニメーション
//

document.addEventListener('DOMContentLoaded', () => {
  const targetElements = document.querySelectorAll('.element')
  // 該当の要素が存在しなければ処理を終了
  if (!targetElements) return

  // ブラウザの内側の高さ
  const windowHeight = window.innerHeight
  // スクロール量
  let lastScrollY = window.scrollY
  // スクロールイベントの連続発火を防ぐためのフラグ
  let isTicking = false

  // 画面リサイズ時にwindowHeightを更新
  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight
  })

  // 要素が表示された時にクラスを付与する関数
  const inviewAnimation = () => {
    targetElements.forEach((element) => {
      const targetPosition = element.getBoundingClientRect().top + lastScrollY
      // 画面外に入っているかどうかを判定するフラグ
      const isInview = lastScrollY > targetPosition - windowHeight + 100
      // クラスのつけ外し
      element.classList.toggle('is-fadein', isInview)
    })
  }

  // スクロールイベント発火時に実行する関数
  const onScroll = () => {
    // inviewAnimationを実行中は処理をスキップ
    if (isTicking) return
    // スクロール量を更新
    lastScrollY = window.scrollY
    // inviewAnimationを実行中にする
    isTicking = true
    /*
    1フレーム待ってからinviewAnimationを実行
    （例えば、画面リサイズでgetBoundingClientRect().topなどの値が更新されるが、このような値の更新と値の取得を同時に実行すると、
    正しく値を取得できないor処理自体がキャンセルされてしまう危険性があるため、確実に値が更新されてから値を取得する必要がある。）
    */
    requestAnimationFrame(() => {
      inviewAnimation()
      // inviewAnimationの完了を知らせる
      isTicking = false
    })
  }

  // スクロールイベントを登録
  window.addEventListener('scroll', onScroll)
})

// 
//// 　横スクロール制御
//
//  const container = document.querySelector('.timeline');
// const slides = document.querySelectorAll('.timelineListContent');
// const containerWidth = container.offsetWidth;
// gsap.to( slides, { // slidesに対して以下のアニメーションを設定
//    xPercent: -110 * (slides.length - 1), // 横に動く方向と距離（この例は右側にスライドの合計幅より少し横スクロール）
//    ease: "none", //アニメーションの種類をnoneにする
//    scrollTrigger: {
//       trigger: container, //containerに到達したら発火
//       pin: true, // ピン留をtrueにすることでcontainerの縦スクロールが止まる
//       markers: true,//デバック用のマーカーを表示
//       scrub: 1, //スクロール当たりのアニメーションが動く時間
//       end:`+=${containerWidth}`,// 横スクロールが終わる地点
//       anticipatePin: 1, // ピン留のタイミング
//       invalidateOnRefresh: true, // リサイズ時の調整でtrueにしておく
//   }
// })
