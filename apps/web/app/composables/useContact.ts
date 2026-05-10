import type { ContactResponseSuccess } from '#shared/types'
import type { ContactFormData } from '~~/shared/schemas'

export const useContact = () => {
  const loading = ref<boolean>(false)

  const sendContactMessage = async (formData: ContactFormData) => {
    loading.value = true
    try {
      const response = await $fetch<ContactResponseSuccess>('/api/contact', {
        method: 'POST',
        body: formData
      })
      return response
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    sendContactMessage
  }
}
