from lib.model import train_model
from lib.extract import feature
if __name__ == "__main__":
    p = train_model()
    f = feature("./resource/temp/03a01Wa.wav")
    print(f)
    print(p(f))
    # print(int(p(f)[0]))
