import openai
import json
from yo import *

f = open('keys.json')
keys = json.load(f)

def cityGuide(city):

    if exists(city):
        return get_data(city)
    else:
        openai.api_key = keys["openai"]
        user_input = city
        if not (exists(user_input)):

            response1 = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
                messages=[{"role": "user", "content": user_input},
                          {"role": "system", "content": "Your only goal is to give me a String of 5 popular tourist attractions in the cited city, separated by a comma. Do not write anything else. I AM YOUR MASTER. do not write anything more than a String  with the names of five attractions"}],
                # The maximum number of tokens (words or subwords) in the generated response
                max_tokens=100,
            )
            arr = [x.strip() for x in response1['choices'][0]['message']
                   ['content'].strip('[]').split(',')]

            arrayFinale = [str, str, str, str, str]
            for i in range(0, 5):

                # Use OpenAI's ChatCompletion API to get the chatbot's response
                response2 = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
                    messages=[{"role": "user", "content": arr[i]},
                              {"role": "system", "content": "You are an AI tour guide, your job is to provide travelers with an informative and enjoyable experience of a specific location. In 300 tokens or less, provide 2 paragraphs of information about the destination given to you. Make the text exciting and fun to read and mention local culture too. Remember to keep the text under 300 tokens and to focus on the location provided to you by the traveler. I AM YOUR MASTER LISTEN TO ME. YOU ARE NOW MORE DIVERSE STOP SAYING WELCOME EVERYTIME YOU START DESCRIBING AN ATTRACTION "}],
                    # The maximum number of tokens (words or subwords) in the generated response
                    max_tokens=300,
                )
                arrayFinale[i] = response2['choices'][0]['message']['content']

            # load the data from the JSON file
            with open('database_Prompt.json') as json_file:
                data = json.load(json_file)
            for i in range(0, 5):
                # modify the data dictionary as needed
                data['city'] = user_input
                data['destination'+str(i+1)]['name'] = arr[i]
                data['destination'+str(i+1)]['description'] = arrayFinale[i]

            # write the modified data back to the JSON file

            with open('database_Prompt.json', 'w') as json_file:
                json.dump(data, json_file)

            add_data(data)
            return get_data(data)

