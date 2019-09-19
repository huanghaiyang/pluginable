import Pluginable from "../src/pluginable"

/**
 * Pluginable test
 */
describe("Pluginable test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Pluginable is instantiable", () => {
    expect(new Pluginable()).toBeInstanceOf(Pluginable)
  })
})
