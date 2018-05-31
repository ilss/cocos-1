MAIN_EFFECTS_ACTION.res = {
    game_tree: "res/img/flag_tree.png",
    game_bg_light: "res/img/flag_bg_light.png",
    game_bg_light_buttom: "res/img/flag_bg_light_buttom.png",
    particles_attack: "res/img/particle.plist",
    particles_attack_ie: "res/img/particle_ie.plist",
    particle_hit: "res/plist/particle_hit.plist",
    particle_fade_in: "res/plist/particle_fadein.plist",
    s_streak: "res/img/r2.png",
    team_bg: "res/img/team_bg.png"
};

MAIN_EFFECTS_ACTION.g_resources = [];
for (var i in MAIN_EFFECTS_ACTION.res) {
    MAIN_EFFECTS_ACTION.g_resources.push(MAIN_EFFECTS_ACTION.res[i]);
}