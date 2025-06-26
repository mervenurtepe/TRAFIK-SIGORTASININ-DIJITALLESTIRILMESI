console.success = function (message) {
    console.log(
        `%c ✅ SUCCESS: ${message}`,
        "color: #006200; background-color: #acf2a7; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
};

console.error = function (message) {
    console.log(
        `%c❌ ERROR: ${message}`,
        "color: #e8cece; background-color: #3F2D2E; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
};

console.warning = function (message) {
    console.log(
        `%c⚠️ WARNING: ${message}`,
        "color: black; background-color: #bca471; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
};

console.info = function (message) {
    console.log(
        `%cⓘ INFO: ${message}`,
        "color: white; background-color: blue; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
};

window.console.success = console.success;
window.console.error = console.error;
window.console.warning = console.warning;
window.console.info = console.info;
