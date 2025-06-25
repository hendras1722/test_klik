'use client'

export async function useApi<T>(
  link: string,
  opts: RequestInit,
  onRequest?: {
    onError: () => void
    onSuccess?: (e: T) => void
  }
) {
  return await fetch(link, {
    ...opts,
    headers: {
      ...opts.headers,
      ...(localStorage.getItem('token') && {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    },
  }).then(async (res) => {
    const json = await res.json()
    if (res.ok && onRequest?.onSuccess) onRequest.onSuccess(json)
    if (!res.ok && onRequest?.onError) onRequest.onError()
    return json
  })
}
