const core = require('@actions/core');
const cache = require('@actions/cache');
const fs = require('fs');
const {cacheKeyStore} = require("./common");

async function restoreCaches() {
    try {
        for (const path in cacheKeyStore) {
            core.startGroup(`Restoring cache for ${path}`);
            const primaryKey = cacheKeyStore[path][0];
            const restoreKeys = cacheKeyStore[path].slice(1);
            const cacheKey = await cache.restoreCache([path], primaryKey, restoreKeys);
            if (cacheKey) {
                core.info(`Cache hit: ${cacheKey}`);
            } else {
                core.info(`Cache miss`);
            }
            core.endGroup();
        }
    } catch (error) {
        core.setFailed(`Cache restore failed: ${error.message}`);
    }
}

async function saveCaches() {
    try {
        for (const path in cacheKeyStore) {
            core.startGroup(`Saving cache for ${path}`);
            const primaryKey = cacheKeyStore[path][0];
            const cacheKey = `${primaryKey}${process.env.GITHUB_RUN_NUMBER}`;
            await cache.saveCache([path], cacheKey);
            core.info(`Cache saved with key: ${cacheKey}`);
            core.endGroup();
        }
    } catch (error) {
        core.setFailed(`Cache save failed: ${error.message}`);
    }
}

async function run() {
    const isPost = core.getState('isPost') === 'true';
    core.info(`Cache paths: ${JSON.stringify(cacheKeyStore)}`);
    if(!isPost) {
        core.saveState('isPost', 'true');
        await restoreCaches();
    } else {
        const isWrite = core.getInput('write').trim() === "true";
        core.info(`Post run vaadin cache should be saved: ${core.getInput('write')}`);
        if(isWrite) {
            await saveCaches();
        }
    }
}

run();
