import { getUserId } from './get-user-id'

describe('Get user id', () => {
  it('should return user id when user obj already exists on request', () => {
    const id = 1
    const req = {
      user: {
        id
      }
    }
    expect(getUserId(req)).toEqual(id)
  })

  it('should return user id from tokenData', () => {
    const sub = 1
    const req = {
      tokenData: {
        sub
      }
    }

    expect(getUserId(req)).toEqual(sub)
  })

  it('should return null when tokenData does not exists', () => {
    const req = {}
    expect(getUserId(req)).toEqual(null)
  })
})
