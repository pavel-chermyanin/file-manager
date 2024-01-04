import os

def generate_file_name(extension):
    # Генерируем случайное имя файла (можно использовать любой другой способ)
    file_name = 'file_' + str(hash(os.urandom(8))) + '.' + extension
    return file_name

# Пример использования для файла с расширением 'txt'
file_extension = 'txt'
result_file_name = generate_file_name(file_extension)
print(result_file_name)