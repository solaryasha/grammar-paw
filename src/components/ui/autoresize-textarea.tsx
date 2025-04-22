import cn from "classnames"
import {  TextareaHTMLAttributes, useRef } from 'react';

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const AutoResizeTextarea = ({
  className, value, onChange, disabled, ...props
}: Props) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
}

  return (
    <textarea
      { ...props}
      value={value}
      onChange={(event) => {
        onChange(event.target.value)
        resizeTextarea()
      }}
      placeholder="Type or paste your text here for grammar checking..."
      rows={1}
      disabled={disabled}
      required
      className={cn("resize-none min-h-4 max-h-50 transition-[height]", className)}
      ref={textareaRef}
    />
  )
}