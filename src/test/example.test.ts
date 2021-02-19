
class Rover {
    getPosition() {
        return ''
    }
}

describe('mars rover', () => {
    it("the rover has an initial position on the plateau", () => {
        const rover = new Rover()
        const initialPosition = rover.getPosition()

        expect(initialPosition).toBe('0:0:N')
    })
})