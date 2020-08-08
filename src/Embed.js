export default class Embed {
    title = "제목"
    description = "내용"
    fields = []
    footer = "푸터"
    color = 0xff0000

    setTitle(title) {
        this.title = title
    }

    setColor(color) {
        this.color = color
    }

    setDescription(desc) {
        this.description = desc
    }

    addField(name, value, inline=false) {
        this.fields.push({name, value, inline})
    }

    asObject() {
        return {
            title: this.title,
            description: this.description,
            color: this.color
        }
    }
}