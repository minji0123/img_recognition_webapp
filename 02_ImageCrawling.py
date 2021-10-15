# from google_images_download import google_images_download   #importing the library

# response = google_images_download.googleimagesdownload()   #class instantiation

# arguments = {"keywords":"Polar bears,baloons,Beaches","limit":20,"print_urls":True}   # 각 키워드마다 20장씩 사진을 저장해서, 각 폴더에 저장함
# paths = response.download(arguments)   #passing the arguments to the function
# print(paths)   #printing absolute paths of the downloaded images


from google_images_download import google_images_download

response = google_images_download.googleimagesdownload()

arguments = {"keywords":"짱구짤, 철수짤, 짱구 유리짤, 맹구짤, 훈이짤, 짱구 수지짤","limit":100,"print_urls":True, "format":"jpg"}
paths = response.download(arguments)   #passing the arguments to the function
print(paths)   #printing absolute paths of the downloaded images