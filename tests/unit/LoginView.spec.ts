import { shallowMount } from "@vue/test-utils";
import LoginView from "@/modules/User/LoginView.vue";
import { createTestingPinia } from '@pinia/testing';

describe("Login component", () => {
    it("some function test", () => {
        const wrapper = shallowMount(LoginView, {
            global: {
                plugins: [createTestingPinia()],
              },
        });
        expect(wrapper.vm).toBeDefined();
    });
});