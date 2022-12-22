import sys
import pickle
def main():
    pickled_model = pickle.load(open(r'N:\Web Development\farmback\ml_model\crop_recommendation\model.pkl', 'rb'))
    pickled_encoder = pickle.load(open(r'N:\Web Development\farmback\ml_model\crop_recommendation\encoder.pkl', 'rb'))
    a=pickled_model.predict([[float(sys.argv[1]),float(sys.argv[2]),float(sys.argv[3]),float(sys.argv[4]),float(sys.argv[5]),float(sys.argv[6]),float(sys.argv[7])]])
    b=pickled_encoder.inverse_transform(a)
    print(b[0])
main()