import requests
import speech_recognition as sr
import os
from gtts import gTTS

bot_message = ""
message = ""

while bot_message != "Goodbye!" or bot_message!= "You are welcome, it was a pleasure to help you.":
    r = sr.Recognizer() # initializing voice recognizer
    with sr.Microphone() as source:
        print("Ask me anything about BVU's CS department")
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source) #listen to the user's voice
        try:
            message = r.recognize_google(audio) #convert the user's voice into text (STT)
            print("You said : {}".format(message))
        
        except:
            print("Sorry could not recognize your voice") #Print this message when the chatbot did not recognize you voice

    #sending your message to the chatbot framework (Rasa)
    if len(message) == 0:
        continue
    r = requests.post('http://localhost:5002/webhooks/rest/webhook', json={"message": message})

    print("BVU_CS_Bot says, ",end=' ')
    for i in r.json():
        bot_message = i['text']
        print(f"{bot_message}")

    myobj = gTTS(text=bot_message)
    myobj.save("speaking_bot.mp3")
    print('saved')
    # playing converted file
    #os.system("mpg321 speaking_bot.mp3")
    os.system("speaking_bot.mp3")