# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

 #from typing import Any, Text, Dict, List

 #from rasa_sdk import Action, Tracker
 #from rasa_sdk.executor import CollectingDispatcher


 #class ActionHelloWorld(Action):

 #    def name(self) -> Text:
 #        return "action_link"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#        CS_Data = "https://buenavistauniversity.sharepoint.com/sites/CS_Data"
#        #Stack_Overflow = "https://stackoverflow.com"
#        #ChatGPT = "https://chat.openai.com"
#        #Canvas = "https://bvu.instructure.com"
#        #Beavernet = "https://beavernet.bvu.edu/ics/"
#
#         #dispatcher.utter_message(text="Hello World!")
#        dispatcher.utter_responses("utter_CSData", tracker, link=CS_Data)
#         return []
