import datetime as dt
import json

def sendSaudacao():
    """ Funcao que apenas verefica o horário e retorna a mensagem a ser exibida de acordo com horario """
    try:
        now = dt.datetime.now()
        if now.strftime("%H") > '18':
            return {"msg" : "Olá, Boa Noite.", "target" : "noite"}
        if now.strftime("%H") > '11':
            return {"msg" : "Olá, Boa Tarde.", "target" : "tarde"}
        return {"msg" : "Olá, Bom Dia.", "target" : "dia"}
    except Exception as err :
        return err