import {actionFactoryBuilder, isAction} from "./action"

describe("Action", () => {


    describe("isAction()", () => {


        it("returns true when the action is of the provided type", () => {


            const someAction = actionFactoryBuilder<{ foo: string }>()

            expect(isAction(someAction, someAction({ foo: "" }))).toEqual(true)

        })

        it("returns false when the action is not of the provided type", () => {


            const someAction = actionFactoryBuilder<{ foo: string }>()
            const otherAction = actionFactoryBuilder<{ foo: string }>()

            expect(isAction(otherAction, someAction({ foo: "" }))).toEqual(false)

        })

    })

})
