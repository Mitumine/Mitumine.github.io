import Typography from 'typography'
import theme from 'typography-theme-github' // テーマのインポート

theme.headerFontFamily = ['Noto Sans JP', 'Roboto', 'serif']
theme.bodyFontFamily = ['Noto Sans JP', 'Roboto', 'serif']
theme.googleFonts = [
    {
        name: 'Noto+Sans+JP',
        styles: ['400'],
    }
]

const typography = new Typography(theme)

export default typography