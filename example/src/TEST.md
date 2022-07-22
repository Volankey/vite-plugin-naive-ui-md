# 开始

## 1. 排版

**粗体** _斜体_

~~这是一段错误的文本。~~

引用:

> Too young!

有充列表:

1.  支持 Vim
2.  支持 Emacs

无序列表:

- 项目 1
- 项目 2

Task list

- [x] task list 1
- [x] task list 2
- [ ] task list 3
  - [ ] task list 3-1
  - [ ] task list 3-2
  - [ ] task list 3-3
- [ ] task list 4
  - [ ] task list 4-1
  - [ ] task list 4-2

## 2. 图片与链接

图片: ![leanote](./assets/y.png)

链接: [这是去往 NaiveUI 的链接](https://naiveui.com)

## 3. 标题

以下是各级标题, 最多支持 5 级标题

```
# h1
## h2
### h3
#### h4
##### h4
###### h5
```

## 4. 代码

示例:

    function get(key) {
        return m[key];
    }

代码高亮示例:

```javascript
/**
 * nth element in the fibonacci series.
 * @param n >= 0
 * @return the nth element, >= 0.
 */
function fib(n) {
  var a = 1,
    b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}

document.write(fib(10));
```

```python
class Employee:
   empCount = 0

   def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1
```

# import code blocks

@[code](./foo.js)

# 5. Markdown 扩展

Markdown 扩展支持:

- 表格
- 定义型列表
- Html 标签
- 脚注
- 目录

## 5.1 表格

| Item     | Value  |
| -------- | ------ |
| Computer | \$1600 |
| Phone    | \$12   |
| Pipe     | \$1    |

可以指定对齐方式, 如 Item 列左对齐, Value 列右对齐, Qty 列居中对齐

| Item     |  Value | Qty |
| :------- | -----: | :-: |
| Computer | \$1600 |  5  |
| Phone    |   \$12 | 12  |
| Pipe     |    \$1 | 234 |

## 5.2 定义型列表

名词 1 : 定义 1（左侧有一个可见的冒号和四个不可见的空格）

代码块 2 : 这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）

        代码块（左侧有八个不可见的空格）

## 5.3 Html 标签

支持在 Markdown 语法中嵌套 Html 标签，譬如，你可以用 Html 写一个纵跨两行的表格：

    <table>
        <tr>
            <th rowspan="2">值班人员</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
        </tr>
        <tr>
            <td>李强</td>
            <td>张明</td>
            <td>王平</td>
        </tr>
    </table>

<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>
 
**提示**, 如果想对图片的宽度和高度进行控制, 你也可以通过img标签, 如:

```html
<img src="./assets/cat.jpg" width="100" />
```

<img src="./assets/cat.jpg" width="100" style="margin-top:20px;" />
