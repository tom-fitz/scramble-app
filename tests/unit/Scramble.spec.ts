import { shallowMount } from "@vue/test-utils";
import Scramble from "@/modules/ProShop/Scramble.vue";
import { createTestingPinia } from '@pinia/testing';

describe("Pro shop scramble component", () => {
    it("should mount", () => {
        const wrapper = shallowMount(Scramble, {
            global: {
                plugins: [createTestingPinia()],
              },
        });
        wrapper.vm.numberOfTeams = 2;
        wrapper.vm.maxGolfersPerTeam = 4;
        expect(wrapper.vm.totalGolfers).toEqual(8);
    });
});