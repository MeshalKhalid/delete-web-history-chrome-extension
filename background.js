const routineOccurrenceInMilliseconds  = 2000;
const searchKeywords = 'GDP';



chrome.runtime.onInstalled.addListener(async () => {

    await runCleanHistoryRoutine()
});


chrome.runtime.onStartup.addListener(async () => {
    await runCleanHistoryRoutine()
})



const cleanHistory = async () => {
    console.log(`Searching in history for words that matches ${searchKeywords}`);

    const result = await chrome.history.search({ text: searchKeywords })

    console.log(`Found ${result.length} result(s)`)

    await result.forEach(async (page) => deletePage(page))
}

const deletePage = async (page) => {
    await chrome.history.deleteUrl({ url: page.url })
    console.log(`${page.url} was deleted...`);
}

const runCleanHistoryRoutine = async () => {
    console.log("running clean history routine");
    setInterval(async () => { await cleanHistory(); }, routineOccurrenceInMilliseconds );
}