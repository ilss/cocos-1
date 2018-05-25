MAIN_EFFECTS_ACTION.res = {
    game_bg: "res/img/layer_bg.jpg",
    game_bg_mask: "res/img/layer_bg_mask.png",
    particles_attack: "res/img/particle.plist",
    particles_attack_ie: "res/img/particle_ie.plist",
    particle_hit: "res/img/particle_hit.plist",
    s_streak: "res/img/r2.png"
};

MAIN_EFFECTS_ACTION.g_resources = [];
for (var i in MAIN_EFFECTS_ACTION.res) {
    MAIN_EFFECTS_ACTION.g_resources.push(MAIN_EFFECTS_ACTION.res[i]);
}