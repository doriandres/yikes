import "./../src/views/counter.view.js";
import { createCounterViewModel } from "./../src/viewmodels/counter.viewmodel.js";

describe("counter view model", () => {
    let viewModel;
    let valueNotifications;

    beforeAll(() => {
        valueNotifications = 0;
        viewModel = createCounterViewModel();
        viewModel.value.observe(() => {
            valueNotifications ++;
        });
    });

    beforeAll(() => viewModel.increase());

    it("should have value equal to 1", () => expect(viewModel.value.get()).toBe(1));

    it("should have notified value only 2 times", () => expect(valueNotifications).toBe(2));
});

describe("counter-view", () => {
    let expectedValue;
    let counter;

    beforeAll(() => {
        expectedValue = 1;
        counter = document.createElement("counter-view");
    });

    beforeAll(() => counter.findView("button").click());

    it("should show value equal to 1", () => {
        const value = counter.findView('p').textContent;
        expect(value).toBe(String(expectedValue));
    });
});