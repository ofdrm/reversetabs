let status = document.getElementById('status');
let reverseAll = document.getElementById('reverseAll');
let reverseSelected = document.getElementById('reverseSelected');

function reverseAllTabs() {
    return new Promise(
        function(resolve, reject) {
            try {
                chrome.tabs.query({currentWindow: true}, tabs => {
                    var tabsCount = tabs.length;
                    // status.innerText += `[Total ${tabsCount} tabs found]`;

                    for (var i = tabsCount - 1; i >= 0; i--) {
                        var tabId = tabs[i].id;
                        var newTabPos = tabsCount;
                        // status.innerText += `[moving tab ${tabId} to position ${newTabPos}]`;

                        chrome.tabs.move(tabId, {index: newTabPos}, (tabs) => {
                            // status.innerText += "[Done]";
                        });
                    }

                    resolve(tabsCount);
                });
            } catch(error) {
                reject(error);
            }
        }
    );
}

function reverseSelectedTabs() {
    return new Promise(function(resolve, reject) {
        try {
            chrome.tabs.query({highlighted: true}, tabs => {
                var tabsCount = tabs.length;
                // status.innerText += `[Total ${tabsCount} tabs found]`;
                var startPosn = tabs[0].index;

                for (var i = 0; i < tabsCount; i++) {
                    var tabId = tabs[i].id;
                    var tabUrl = tabs[i].url;
                    // status.innerText += `[${i} = ${tabUrl}]`;
                    // status.innerText += `[moving tab ${tabUrl} to position ${startPosn}]`;

                    chrome.tabs.move(tabId, { index : startPosn}, (tabs) => {
                        // status.innerText += "[Done]";
                    });
                }

                resolve(tabsCount);
            });
        } catch (error) {
            reject(error);
        }
    });
}

reverseAll.onclick = function(e) {
    reverseAllTabs().then(tabsCount => {
        // status.innerTest += `[Got back ${tabsCount} tabs]`;
    }, err => console.log(err));
};

reverseSelected.onclick = function(e) {
    // status.innerText += "[reverseSelected]";
    reverseSelectedTabs().then(tabsCount => {
        // status.innerText += `[Got back ${tabsCount} tabs]`;
    }, err => {
        console.log(err);
        // status.innerText += `[error: ${err}]`;
    })
}
