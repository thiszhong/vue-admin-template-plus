(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tsparticles-plugin-absorbers", "tsparticles-updater-destroy", "tsparticles-plugin-emitters", "tsparticles-interaction-external-trail", "tsparticles-updater-roll", "tsparticles-slim", "tsparticles-updater-tilt", "tsparticles-updater-twinkle", "tsparticles-updater-wobble"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadFull = void 0;
    const tsparticles_plugin_absorbers_1 = require("tsparticles-plugin-absorbers");
    const tsparticles_updater_destroy_1 = require("tsparticles-updater-destroy");
    const tsparticles_plugin_emitters_1 = require("tsparticles-plugin-emitters");
    const tsparticles_interaction_external_trail_1 = require("tsparticles-interaction-external-trail");
    const tsparticles_updater_roll_1 = require("tsparticles-updater-roll");
    const tsparticles_slim_1 = require("tsparticles-slim");
    const tsparticles_updater_tilt_1 = require("tsparticles-updater-tilt");
    const tsparticles_updater_twinkle_1 = require("tsparticles-updater-twinkle");
    const tsparticles_updater_wobble_1 = require("tsparticles-updater-wobble");
    async function loadFull(engine) {
        await (0, tsparticles_slim_1.loadSlim)(engine);
        await (0, tsparticles_updater_destroy_1.loadDestroyUpdater)(engine);
        await (0, tsparticles_updater_roll_1.loadRollUpdater)(engine);
        await (0, tsparticles_updater_tilt_1.loadTiltUpdater)(engine);
        await (0, tsparticles_updater_twinkle_1.loadTwinkleUpdater)(engine);
        await (0, tsparticles_updater_wobble_1.loadWobbleUpdater)(engine);
        await (0, tsparticles_interaction_external_trail_1.loadExternalTrailInteraction)(engine);
        await (0, tsparticles_plugin_absorbers_1.loadAbsorbersPlugin)(engine);
        await (0, tsparticles_plugin_emitters_1.loadEmittersPlugin)(engine);
    }
    exports.loadFull = loadFull;
});
