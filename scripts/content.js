const seekbar = document.querySelectorAll('[data-test-selector="seekbar-interaction-area__interactionArea"]');

console.log('shawny');

if (seekbar) {
    let el = seekbar[0].children[0].children;
    var videoElement = document.querySelector('video');

    function checkTimeRange(el, index) {
        return new Promise(function (resolve, reject) {
            let currentTime = parseFloat(el[0].style.left);
            let left = parseFloat(el[index].style.left);
            let width = parseFloat(el[index].style.width);
            console.log(`${width} => ${left} => ${left + width} => ${currentTime}`);
            if (currentTime >= left && currentTime < left + width) {
                var newTime = videoElement.currentTime + (width / 100) * videoElement.duration;
                videoElement.currentTime = newTime;
                setTimeout(function () {
                    console.log("SKIP!");
                    resolve();
                }, 1500);
            } else {
                resolve();
            }
        });
    }

    function checkTimeRanges(el, delay) {
        var index = 0;
        function checkNextTimeRange() {
            if (index < el.length && (i!==0 && i!==1 && i!==(el.length-1))) {

                checkTimeRange(el, index).then(function () {
                    index++;
                    setTimeout(checkNextTimeRange, delay);
                }).catch(function (error) {
                    console.error(error);
                    index++;
                    setTimeout(checkNextTimeRange, delay);
                });
            }
        }
        checkNextTimeRange();
    }

    checkTimeRanges(el, 1000);
}