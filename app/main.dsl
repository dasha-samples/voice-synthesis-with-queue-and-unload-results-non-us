import "commonReactions/all.dsl";
context
{
    input phone: string;
}

start node root
{
    do
    {
        #connectSafe($phone);
        #say("greeting");
        wait *;
    }
    transitions
    {
        transition0: goto bye on true;
    }
}

node bye
{
    do
    {
        #sayText("Если у вас возникли вопросы то обращайтесь в наше комьюнити. До свидания."); //Если фраза Даши одна, то можно не пользоваться phrasemap.json, а использовать команду #sayText
        exit;
    }
}