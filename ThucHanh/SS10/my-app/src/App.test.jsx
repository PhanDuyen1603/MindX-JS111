import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('Yêu cầu 3: Modal thêm task mới', () => {
  describe('Bước 1: Nút New Item mở modal', () => {
    it('Modal ẩn khi chưa click New Item', () => {
      render(<App />)
      expect(screen.queryByText('Save task')).not.toBeInTheDocument()
    })

    it('Modal hiển thị khi click nút New Item', () => {
      render(<App />)
      const newItemBtn = screen.getByRole('button', { name: /new item/i })
      fireEvent.click(newItemBtn)
      expect(screen.getByText('Save task')).toBeInTheDocument()
    })
  })

  describe('Bước 2: Đóng modal khi click X hoặc Cancel', () => {
    it('Modal đóng khi click nút Cancel', async () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: /new item/i }))
      expect(screen.getByText('Save task')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
      await waitFor(() => {
        expect(screen.queryByText('Save task')).not.toBeInTheDocument()
      })
    })

    it('Modal đóng khi click nút X (close)', async () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: /new item/i }))
      expect(screen.getByText('Save task')).toBeInTheDocument()
      const closeBtn = document.querySelector('.ant-modal-close')
      expect(closeBtn).toBeTruthy()
      fireEvent.click(closeBtn)
      await waitFor(() => {
        expect(screen.queryByText('Save task')).not.toBeInTheDocument()
      })
    })
  })

  describe('Bước 3: Giao diện modal theo design', () => {
    it('Modal có form 2 cột: Title, Description, Status bên trái; End Date, Assign bên phải', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: /new item/i }))
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/type title of task/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/type description/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/assign/i)).toBeInTheDocument()
    })

    it('Modal có icon flag và title "Save task"', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: /new item/i }))
      expect(screen.getByText('Save task')).toBeInTheDocument()
      const flagImg = document.querySelector('.modal-flag-icon')
      expect(flagImg).toBeInTheDocument()
    })

    it('Modal có nút Cancel và Save', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: /new item/i }))
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    })
  })
})
