window.onload = function() {
    const seekbar = document.querySelectorAll('[data-test-selector="seekbar-interaction-area__interactionArea"]');
    let el = seekbar[0].children[0].children;
    var videoElement = document.querySelector('video');

    function checkTimeRange(el, index) {
        return new Promise(function (resolve, reject) {
            let width = parseFloat(el[index].style.width);
            let left = parseFloat(el[index].style.left);

            videoElement.pause();
            videoElement.currentTime = videoElement.duration * ((left+width)/100);
            videoElement.play();
            setTimeout(function () {
                console.log("SKIP!");
                resolve();
            }, 1000);
        });
    }

    function checkTimeRanges(el, delay) {
        var index = 2;
        function checkNextTimeRange() {
            if (index < el.length && index!==(el.length-1)) {
                let currentTime = parseFloat(el[0].style.left);
                let left = parseFloat(el[index].style.left);
                let width = parseFloat(el[index].style.width);
    
                if (currentTime >= left && currentTime < left + width) { // This detects whether you're in a muted section
                    console.log('IN ZONE');
                    checkTimeRange(el, index).then(function () {
                        index++;
                        setTimeout(checkNextTimeRange, delay);
                    }).catch(function (error) {
                        console.error(error);
                        index++;
                        setTimeout(checkNextTimeRange, delay);
                    });
                } else {
                    index++;
                    checkNextTimeRange();
                }
            }
        }
        checkNextTimeRange();
    }

    const rightControlGroup = document.querySelector('.player-controls__right-control-group');
    const buttonElement = document.createElement('button');
    buttonElement.id = 'skipVod';
    buttonElement.textContent = 'Skip';
    buttonElement.addEventListener('click', () => {
        checkTimeRanges(el, 1500);
    });
    rightControlGroup.insertAdjacentElement('afterbegin', buttonElement);

}