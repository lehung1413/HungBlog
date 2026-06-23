import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { uploadImage, type StorageBucket } from '@/services/storage.service'

interface ImageUploaderProps {
  bucket: StorageBucket
  value: string | null
  onChange: (url: string | null) => void
  label?: string
}

export function ImageUploader({ bucket, value, onChange, label = 'Image' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadImage(bucket, file)
      onChange(url)
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
      {value ? (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Box component="img" src={value} alt="Preview" sx={{ height: 128, borderRadius: 1, border: 1, borderColor: 'divider', objectFit: 'cover' }} />
          <IconButton
            size="small"
            color="error"
            onClick={() => onChange(null)}
            sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Button variant="outlined" disabled={uploading} startIcon={<CloudUploadIcon />} onClick={() => inputRef.current?.click()}>
          {uploading ? 'Uploading...' : 'Upload image'}
        </Button>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
    </Box>
  )
}
