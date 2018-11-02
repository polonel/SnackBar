declare module 'node-snackbar' {
  export = Snackbar
}

declare namespace Snackbar {
  function show (options: SnackbarOptions): void
}

interface SnackbarOptions {
  /** The text to displae inside the notification. (default: null) */
  text?: string
  /** Text color of the notification text. (default: '#FFFFFF') */
  textColor?: string
  /** The position the notification will show. Refer to the examples above for possible positions. (default:    bottom-left) */
  pos?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right'
  /** Add a custom class to the notification for custom styling. (default: null) */
  customClass?: string
  /**
  * Width of the notification. Used to shrink/expand window as you wish.
  * Accepted value is same as HTMLElement.style.width
  * (default: 'auto')
  */
  width?: string
  /** to show the action buton or not. (default: true) */
  showAction?: boolean
  /** Text to display as the action button. (default: 'Dismiss') */
  actionText?: string
  /** Text color of the action button. (default: '#4CAF50') */
  actionTextColor?: string
  /** Background color of the notification window. (default: '#323232') */
  backgroundColor?: string
  /**
  * Time in milliseconds the notification is displayed before fading out.
  *  Passing 0 or null as value will cause the notification to be permanent until dismissed by clicking the button.
  *  (default: 5000)
  */
  duration?: number
  /** Default action closes the notification. */
  onActionClick?: (element: HTMLElement) => void
  /** Event fired when the notification has closed. */
  onClose?: (element: HTMLElement) => void
}
