import os
import cv2
import openai
import easyocr
import matplotlib.pyplot as plt
from torch.cuda import is_available
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()
client = AzureOpenAI(
  azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"), 
  api_key=os.getenv("AZURE_OPENAI_KEY"),  
  api_version="2023-05-15"
)


class Reader:
    def __init__(self, is_cuda=False):
        self.reader = easyocr.Reader(['vi'], gpu=is_cuda, model_storage_directory=os.path.join('models'), download_enabled=True)

    def __call__(self, img):
        return self.extract_text(img)

    def extract_text(self, img, show_text=False, show_confidence=False):
        result = self.reader.readtext(img)

        extracted_text = []

        for text in filter(lambda x: x[-1] > .45, result):
            box, acc_text, confidence = text

            # box[0] and box[2] - upper left and lower right corners of the box
            img = cv2.rectangle(img, [int(i) for i in box[0]], [int(i) for i in box[2]], (0, 255, 0), 2) # each coordinate is a list has to be int

            if show_text and show_confidence:
                img_text = f'{acc_text} - ({"{:.3f}".format(confidence)}%)'

            elif show_text:
                img_text = acc_text

            elif show_confidence:
                img_text = f'CONF: ({"{:.3f}".format(confidence)}%)'

            if show_text or show_confidence:
                img = cv2.putText(
                    img, 
                    img_text, 
                    (int(box[0][0]), int(box[0][1] - 3)), 
                    cv2.FONT_HERSHEY_SIMPLEX, 
                    fontScale=.5, 
                    color=(168, 90, 50),
                    thickness=2
                )

            extracted_text.append(acc_text)

        return extracted_text, img

class GPT_3:
    def __init__(self, api_key):
        client.api_key = api_key
        self.options = {
            'temperature': 0.25,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0,
            'max_tokens': 512
        }

    def __call__(self, prompt, options=None):
        return self.prediction(prompt, options)

    def prediction(self, text, options=None):
        if not options:
            options = self.options

        response = client.chat.completions.create(
            model='GPT35TURBO16K',
            messages=[
                {"role": "system", "content": "Bạn là một người hỗ trợ học sinh trong việc học địa lý"},
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content
    
    def summarize(self, text):
        # vietnamese_text = self.translate_to_vietnamese(text)
        prompt = f'Hãy giúp tôi tóm tắt thông tin sau bằng tiếng Việt và sau đó chỉ ra những số liệu quan trọng!\n\n{text}'

        return self.prediction(text=prompt)

    
def read_img(img_path):
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    return img


if __name__ == '__main__':
    
    reader = Reader(is_cuda=is_available())
    
    gpt_3 = GPT_3(client.api_key)

    img = read_img('./img/img1.png')
    text, extracted_image = reader(img)
    
    text = ' '.join(text)

    print('Extracted_text')
    print(text)
    summarization_result = gpt_3.summarize(text)

    print('Summarized text:')
    print(summarization_result)
    
    plt.imshow(extracted_image)
    plt.show()