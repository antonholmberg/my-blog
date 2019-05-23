import sys


def main():
    path = sys.argv[1]

    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    output = ""
    in_code_block = False
    for i in range(0, len(text)):
        current_char = text[i]
        if not in_code_block and current_char == '\n' and text[i - 1] != '\n':
            output += " "
            continue
        elif current_char == '\n' and text[i - 1] == '\n':
            output += '\n'

        if current_char == '`' and text[i + 1] == '`' and text[i + 2] == '`':
            in_code_block = not in_code_block

        output += current_char

    print(output)


if __name__ == "__main__":
    main()
