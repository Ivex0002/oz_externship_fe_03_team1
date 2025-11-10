import { api } from './api'

export const getLectureData = async () => {
  try {
    const res = await api.v1.lectures.GET()
    if (!res) throw new Error()

    return res
  } catch (e) {
    console.log(e)
  }
}
