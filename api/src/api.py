import hug
from controller.saudacao import sendSaudacao

api = hug.API(__name__)

#Minhas rotas
@hug.get('/saudacao')
def respSaudacao(response):
    """Retorna um objeto com a mensagem a ser apresentada de acordo com o horário"""
    response and response.set_header('Access-Control-Allow-Origin', '*')
    return sendSaudacao()



if __name__ == '__main__' :
    respSaudacao.inteface.cli()