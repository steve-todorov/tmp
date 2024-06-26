const cacheKeyStore = {
    'webapp/src/main/bundles/prod.bundle': [
        `${process.env.RUNNER_OS}-vaadin-prod-bundle-${process.env.INPUT_BRANCH}-`,
        `${process.env.RUNNER_OS}-vaadin-prod-bundle-main-`
    ],
    'webapp/node_modules/.sass_gradle': [
        `${process.env.RUNNER_OS}-sass-${process.env.INPUT_BRANCH}-`,
        `${process.env.RUNNER_OS}-sass-main-`
    ],
    '~/.vaadin/node*': [
        `${process.env.RUNNER_OS}-vaadin-node-${process.env.INPUT_BRANCH}-`,
        `${process.env.RUNNER_OS}-vaadin-node-main-`
    ]
};

module.exports = {
    cacheKeyStore
};
