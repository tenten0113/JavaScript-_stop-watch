'use strict;'

//定数に各ドキュメントのIDを再代入を必要としない関数を定義する
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  //再代入を必要とする関数を宣言する
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
   //スタートタイムは外でも使うため再代入してあげる

  function countUp() {
    //経過時間 = 現在の時刻 - スタートタイム,countUp関数を定義する
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');
    timer.textContent = `${m}:${s}.${ms}`;


    //10ミリ秒ごとに処理を実行するsetTimeout関数にカウントアップを呼び出す、setTimeout関数にtimeoutIdを宣言
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  //ボタンの有効無効を切り替える関数を定義
   function setButtonStateIntial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');

   }

   function setButtonStateRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
   }

   function setButtonStateStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
   }

  /*スタートボタンのイベント関数に
  第一関数にクリックイベント、第二関数の中に
  スタートタイム＝クリックされた時の時刻と定義してやる
  カウントアップしてやる*/

  start.addEventListener('click',() => {
    if(start.classList.contains('inactive') === true){
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  //ストップでsetTimeout()をキャンセルするためにtimeoutIdを渡す
  stop.addEventListener('click',() => {
    if(stop.classList.contains('inactive') === true){
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  //リセットで初期状態に要素のidを書き換える
  reset.addEventListener('click',() => {
    if(reset.classList.contains('inactive') === true){
      return;
    }
    setButtonStateIntial();
    timer.textContent = "00:00.000";
    elapsedTime = 0;
  });
}
