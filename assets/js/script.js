chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "btnclicked") {
            // location.replace(request.link);
            window.open(request.link, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1000,height=1000");
        }
    }

);