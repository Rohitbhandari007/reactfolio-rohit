import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function article_1() {
	return {
		date: "7 May 2023",
		title: "Django and Esewa Payment Integration",
		description:
			"Cloud computing offers a range of benefits, including cost savings and increased flexibility. Find out why more businesses are turning to the cloud.",
		keywords: [
			"Django and Esewa Payment Integration",
			"Rohit",
			"Rohit B",
			"Rohit Bhandari",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: start;
					gap:10px;
				}

				.randImage {
					align-self: center;
					border-radius:10px;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						In this tutorial, we will explore how to integrate the
						eSewa payment gateway into a Django project. By the end,
						you'll have a functioning payment system allowing
						customers to make payments using eSewa.
					</div>
					<div className="paragraph">
						Setting Up the Django Project: Before we dive into the
						payment integration, let's set up our Django project.
						Follow these steps:
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`django-admin startproject mainproject
cd mainproject
python manage.py startapp payment`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						In the 'payment' app, we need to define the models
						required to store order details. Open the
						'payment/models.py' file and add the following code:
						<br></br>
						(Note that we are using a really simple implementation
						of Order model)
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=50)
    order_id = models.CharField(max_length=6, null=True, unique=True)
    total_price = models.IntegerField()
    is_paid = models.BooleanField(default=False)
    paid_amount = models.IntegerField(null=True, blank=True)`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						This model represents an order and includes fields for
						the name, order ID, total price, payment status, and
						paid amount. By default, the is_paid field is set to
						False, indicating that the order has not been paid yet.
						The paid_amount field is initially set to None. After a
						successful payment with eSewa, is_paid will be set to
						True, and the paid_amount will reflect the amount paid
						with esewa for the order.
						<br></br> <h3>Creating the Views:</h3> Now, let's create
						the views for displaying the order list and the order
						checkout page. Open the 'payment/views.py' file and add
						the following code:
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`from django.shortcuts import render
from .models import Order

def orders_list(request):
    orders = Order.objects.all()
    context = {"orders": orders}
    return render(request, 'payment/orders.html', context)


def order_checkout(request, id):
    order = Order.objects.get(id=id)
    context = {"order": order}
    return render(request, 'payment/order_checkout.html', context)`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						The orders_list view retrieves all orders from the
						database and passes them to the 'payment/orders.html'
						template. The order_checkout view retrieves a specific
						order based on the provided ID and passes it to the
						'payment/order_checkout.html' template. Defining URL
						Patterns: Now, let's define the URL patterns for our
						views. Open the 'payment/urls.py' file and add the
						following code:
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`from django.urls import path
from .views import *

urlpatterns = [
    path('', orders_list, name="orders_list"),
    path('checkout/<int:id>/', order_checkout, name="order_checkout"),
]`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						The templates code : Orders.html
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="html"
							style={dracula}
						>
							{`{% extends 'payment/base.html' %}

{% block content %}
<h3>Orders List</h3>
<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Paid</th>
        <th scope="col">Paid Amount</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
        {% for order in orders %}
        <tr>
            <th scope="row">{{order.id}}</th>
            <td>{{order.name}}</td>
            <td>{{order.is_paid}}</td>
            <td>{{order.paid_amount}}</td>
            <td><a href="{% url 'order_checkout' order.id %}"><button class="btn btn-primary">Check Out</button></a></td>
        </tr>
        {% endfor %}
  
    </tbody>
  </table>

{% endblock content %}`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						The templates code : order_checkout.html
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="html"
							style={dracula}
						>
							{`{% extends 'payment/base.html' %}

{% block content %}
<h2 class='mt-4'>Order Checkout</h2>
<div class="card">
    <div class="card-body">
        <p>Name : {{order.name}}</p>
        <p>Price : {{order.total_price}}</p>
        <p>Paid: {{order.is_paid}}</p>
   
       <!--  This Form redirects us to esewa to carry out payment process  -->
        <form action="https://uat.esewa.com.np/epay/main" method="POST">
            <input value="10" name="tAmt" type="hidden">
            <input value="10" name="amt" type="hidden">
            <input value="0" name="txAmt" type="hidden">
            <input value="0" name="psc" type="hidden">
            <input value="0" name="pdc" type="hidden">
            <input value="EPAYTEST" name="scd" type="hidden">
            <input value="{{order.order_id}}" name="pid" type="hidden">
            <input value="http://127.0.0.1:8000/esewa-callback/" type="hidden" name="su">
            <input value="http://127.0.0.1:8000/payment-failed/" type="hidden" name="fu">
            <input value="Pay With Esewa" type="submit" class="btn btn-success"> 
            </form>
 
    </div>
</div>
{% endblock content %}`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						Explaining Esewa Form:<br></br>If you click on "Pay With
						Esewa" button, you will be redirected to esewa website
						for payment.<br></br> Credentials For Test Environment:
						<br></br>
						<SyntaxHighlighter>
							eSewa ID: 9806800001/2/3/4/5 MPIN: 1234 OTP: 123456
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">How is this working ?</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="html"
							style={dracula}
						>
							{`<!--This url is for test environment -->

<form action="https://uat.esewa.com.np/epay/main" method="POST">

<!----- For Production --->
<form action="https://esewa.com.np/epay/main" method="POST">`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						We are calling POST method to given url where we will be
						redirected to after button is submitted. Since it's POST
						request, what data should we give to ESEWA for it to
						know our payment information ? We need to give following
						data to ESEWA.
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="html"
							style={dracula}
						>
							{`<input value="10" name="tAmt" type="hidden">
<input value="10" name="amt" type="hidden">
<input value="0" name="txAmt" type="hidden">
<input value="0" name="psc" type="hidden">
<input value="0" name="pdc" type="hidden">

<!-- Name of the merchant ( For Test use  'EPAYTEST') -->
<input value="EPAYTEST" name="scd" type="hidden">

<!-- Unique ID of the product to identify the product
 ( Make it unique otherwise the payment will fail ) --->
<input value="{{order.order_id}}" name="pid" type="hidden">

<!-- Esewa will redirect to this url if the payment succeeds -->
<input value="http://127.0.0.1:8000/esewa-callback/" type="hidden" name="su">

<!-- Esewa will redirect to this url if the payment fails -->
<input value="http://127.0.0.1:8000/payment-failed/" type="hidden" name="fu">`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						Note: value of amt + txAmt + psc must be equal to value
						of tAmt. Otherwise the payment will fail.
					</div>
					<div className="paragraph">
						If the payment is successfull, we will be redirected to
						the success url that we provided on the form. Esewa will
						add some query paramaters on the urls to add information
						about the payment which we need to verify the
						transaction .
					</div>
					<div className="paragraph">
						<SyntaxHighlighter>
							http://success_callback_url/?q=su&oid=ee2c&amt=100&refId=000AE01
						</SyntaxHighlighter>
						<br></br>?q=su&oid=ee2c&amt=100&refId=000AE01 are added
						to the success url by esewa. We will use this value to
						hit another api for the verification of the transaction
						.
					</div>
					<div className="paragraph">
						How should we verify the transaction? To make sure that
						the transaction is correct and valid , we need to check
						the correctness using an API provided by the ESEWA . .
					</div>
					<div className="paragraph">
						Anyone can copy the success url and change the
						information. So before updating the paid status of order
						or any product, we first need to verify that the
						transaction is authentic.
					</div>
					<div className="paragraph">
						We need to check the correctness of the transaction with
						given url:
						<br></br>
						"https://uat.esewa.com.np/epay/transrec"<br></br> As a
						body, pass
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="javascript"
							style={dracula}
						>
							{`{
    'amt': 'amount', //total amount of service 
    'scd': 'merchant_id', //merchant id
    'rid': 'rid', //reference id provided by esewa
    'pid':'"uniqueid', //unique id of the product
}`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						Implementation in Django View The implementation for the
						callback verification and updating of the status of the
						model can be done in various ways. It depends whether we
						are making it an API or using with MVT pattern. Since we
						are showing examples on MVT , the views would be :
						Install requests and xmltodict
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`pip install requests
pip install xmltodict`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`from django.shortcuts import render,redirect,get_object_or_404
from .models import Order
import requests
import xmltodict


def esewa_callback_view(request):
    oid = request.GET.get("oid")
    amt = request.GET.get("amt")
    refId = request.GET.get("refId")
    url ="https://uat.esewa.com.np/epay/transrec"
    data = {
            'amt': amt,
            'scd': 'EPAYTEST',
            'rid': refId,
            'pid':oid,
        }
    response = requests.post(url, data=data)
    json_response =xmltodict.parse(response.content)
    status = json_response["response"]["response_code"]

    if status != "Success":
        return redirect("payment_failed")
    order = get_object_or_404(Order,order_id=oid)

    # Do this in production (EXPLAINED BELOW IN DETAIL )
    # Esewa test allows price upto Rs. 100 only 
    # if order.total_price != int(amt):
    #     return redirect("payment_failed")

    order.is_paid=True
    order.paid_amount =int(float(amt))
    order.save()
    return render(request,'payment/esewa-callback.html')

def payment_failed(request):
    return render(request,'payment/payment_failed.html')`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						The verify api gives response in xml . <br></br>To
						covert that to json, use xmltodict package. If the
						transaction is authentic then, the response would be
						"Success" else it will be failed.We are updating the
						product status only if transaction is verified.
						<br></br>But What if the transaction is paid less than
						the actual cost of the product? In this the case the
						transaction will be authentic but the product shouldn't
						be changed cause the exact amount must be paid. For that
						:
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`# In Test environment, Esewa only allows max 100 rupees 
# Obviously this cannot handle every product price 
# so either check this condition on live environment  or 
# make every product price lower than Rs 100

if order.total_price != int(amt):
     return redirect("payment_failed")
# update product here`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						If this view is successfully rendered, it means it's a
						valid payment otherwise Payment Failed Page will be
						shown. In this way , We can Integrate Esewa And Django
						using MVT Approach.
					</div>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "01 July 2023",
		title: "HBL International Payment Integration with Django",
		description:
			"Lets learn aboout HBL International Payment Integration with Django",
		style: ``,
		keywords: [
			"HBL International Payment Integration with Django",
			"Rohit",
			"Rohit B",
			"Rohit Bhandari",
		],
		body: (
			<React.Fragment>
				<div className="paragraph">
					In this tutorial we are going to quickly implement HBL
					payment getway system with django.
					<br></br>I hope that you already have installed django and
					set up the project.
					<br></br>
					<b>Step 1 : </b>
					<br></br>
					First of all you have to contact the HBL support team and
					get a document and demo file including the required API keys
					( I hope you already have it ready).
					<br></br>
					The reason of making this tutorial is because the demo file
					provided by the HBL was written in PHP and after a lots of
					hit and trial it finally worked. Thats why I wrote this to
					minimize it and complete the workflow using python.
				</div>
				<div className="paragraph">
					<b>Step 2 : </b>
					<br></br>
					Now the setup begins:
					<br></br>
					You need to install following library as HBL uses digital
					signature for the encryption and decryption of their
					payload. Its not necessary in the test environment but will
					be used in production anyway :
					<SyntaxHighlighter language="python" style={dracula}>
						{`pip install python-jose`}
					</SyntaxHighlighter>
				</div>
				<div className="paragraph">
					<b>Step 3 : </b>
					<br></br>
					Lets use old school class to generalize the process :
					<br></br>
					Here we create a class named as HBLGetway where we set up
					the generic fields which will be used in multiple payloads.
					<br></br>
					<b>
						You need to set the API keys required for the testing in
						your .env file and configure through settings to make
						sure credentials are safe.
					</b>
					<br></br>
					<SyntaxHighlighter language="python" style={dracula}>
						{`import datetime
import json
import uuid 
from jose import jwe, jws
from django.config import settings


class HBLGetway: 
	now = datetime.datetime.now()
	iss = settings.HBL_TEST_KEY aud = "PacoAudience" iat =
	int(now.timestamp()) nbf = int(now.timestamp()) exp =
	int((now + datetime.timedelta(hours=1)).timestamp())
	request_date_time =
	now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
	office_id=settings.HBL_OFFICE_ID
	company_api_key=settings.HBL_TEST_KEY guid = str(uuid.uuid4())
						`}
					</SyntaxHighlighter>
					Now moving on to the methods of this class, In the first
					method we are creating a payload to generate a payment page.
					<br></br>
					We have to create a dictionary which includes the required
					data for the generation of payload and convert it into a
					string with the definate formatting as in the code. Because
					we have to encrypt it later as a string.
				</div>
				<div className="paragraph">
					<SyntaxHighlighter language="python" style={dracula}>
						{`def get_encrypted_payload(self,**kwargs):

	#dummy order
	order_number = 1234
	order_desc = "Shoes"
	transaction_amount = 1000
	amount_text="000000100000"
	amount_decimal=2
	currency_code = "NPR"

	#these url are the redirection urls which will be responsible for redirecting to a specific page after any action
	cancel_url = "example.com"
	confirm_url="example.com"
	failed_url = "example.com"
	backend_url="example.com"

	request_payload = {
		"iss":self.iss,
		"aud":self.aud,
		"CompanyApiKey":self.self.company_api_key,
		"iat":self.iat,
		"nbf":self.nbf,
		"exp":self.exp,
		"request":{
			

		"apiRequest": {
		"requestMessageID": self.guid,
		"requestDateTime": self.request_date_time,
		"language": "en-US"
		},
		
		"officeId":self.office_id,
		"orderNo": order_number,
		"productDescription": order_desc,
		"paymentType": "CC",
		"paymentCategory": "ECOM",

		"storeCardDetails": {
			"storeCardFlag": "N",
			"storedCardUniqueID": guid
		},
		
		"installmentPaymentDetails": {
			"ippFlag": "N",
			"installmentPeriod": 0,
			"interestType": None,
		},
		"mcpFlag": "N",
		"request3dsFlag": "N",
		"transactionAmount": {
			"amountText": amount_text,
			"currencyCode": currency_code,
			"decimalPlaces": amount_decimal,
			"amount": transaction_amount
		},
		"notificationURLs": {
			"confirmationURL": confirm_url,
			"failedURL": failed_url,
			"cancellationURL": cancel_url,
			"backendURL": backend_url
		},
		"deviceDetails": {
			"browserIp": "1.0.0.1",
			"browser": "Postman Browser",
			"browserUserAgent": "PostmanRuntime/7.26.8 - not from header",
			"mobileDeviceFlag": "N"
		},
		"purchaseItems": [
			{
				"purchaseItemType": "ticket",
				"referenceNo": "2322460376026",
				"purchaseItemDescription": "Bundled insurance",
				"purchaseItemPrice": {
					"amountText": amount_text,
					"currencyCode": currency_code,
					"decimalPlaces": amount_decimal,
					"amount": transaction_amount
				},
				"subMerchantID": "string",
				"passengerSeqNo": 1
			}
		],
		"customFieldList": [
			{
				"fieldName": "TestField",
				"fieldValue": "This is test"
			}
		],
		},
		}

	data_to_encrypt = json.dumps(request_payload).encode('utf-8')   
	
	#dont worry its on the next method
	encrypted_data= self.encrypt_and_sign_payload(data_to_encrypt)
	return encrypted_data
`}
					</SyntaxHighlighter>
				</div>

				<div className="paragraph">
					Now after creating the payload we need to sign it using the
					specific algorithms provided by HBL international Getway.
					<br></br>
					<b>
						Note: You will be provided with the available algorithms
						by the HBL team in documentation :
					</b>
					<br></br>
					In this process at first we have to create a RSA key. In the
					demo file they have included a website that genreates a rsa
					key pair. But its formatting did not support with the
					python-jose library, and after some research OpenSSL was the
					solution that I found.
					<br></br>
					Create a key pair using OpenSSl cli and store the private
					key in "private_key.pem" file and public key in
					"public_key.pem" file.
					<br></br>
					<b>
						Note : I have included the pem file path in base
						directory in this code which you can change as per your
						convienence
					</b>
					<SyntaxHighlighter language="python" style={dracula}>
						{`def encrypt_and_sign_payload(self,payload):
signin_algorithm =settings.SIGNIN
main_encryption_algorithm= settings.ENCMAIN
encryption =settings.ENCJWT

private_key_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'private_key.pem')
public_key_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public_key.pem')


with open(private_key_path, 'rb') as f:
	private_key_pem = f.read()
	
with open(public_key_path, 'rb') as f:
	public_key_pem = f.read()

# private_jwk = jwk.construct(private_key_pem, algorithm=signin_algorithm)
signed_payload = jws.sign(payload, private_key_pem,algorithm=signin_algorithm)


signed_and_encrypted_payload = jwe.encrypt(signed_payload,key=public_key_pem, encryption=encryption,algorithm=main_encryption_algorithm)

token_string = signed_and_encrypted_payload.decode('utf-8')


return token_string
					
`}
					</SyntaxHighlighter>
				</div>
				<div className="paragraph">
					Now we need to call the api using this paylaod:
					<br></br>
					You will be able to see the payment page :
					<SyntaxHighlighter language="python" style={dracula}>
						{`class HBLPaymentView(APIView):

    base_url = settings.HBL_URL
	hbl_payload = HBLGetway()
 
    def get(self, request):
    
        
        url =self.base_url + "/api/1.0/Payment/prePaymentUi"
        headers ={
   
            "Accept":"application/json",
            "CompanyApiKey":"your_company_key",
            "Content-Type":"application/jose; charset=utf-8"
        }
		
        payload = self.hbl_payload.get_encrypted_payload()
        response = requests.post(url,headers=headers, data=payload)
        data = response.content
        payment_page_url = data["data"]["paymentPage"]["paymentPageURL"]
        return Response(payment_page_url)
`}
					</SyntaxHighlighter>
				</div>
				<div className="paragraph">
					After a successful or failed transaction we will be
					redirected to a specific url that we provided before in the
					payload (Notification Url dict)
					<br></br>
					On success you will be redirected to the url that were
					provided and will get a "orderNo" in the qurey parameters
					that you provided before while generting the payment UI.
					<br></br>
					Example : example.com/?orderNo=1234
					<br></br>
					We can now confirm the transaction is complete by one final
					verification, just to be sure.
					<br></br>
					We will create a method in the same class that we previously
					craeted and create another payload for the process :
					<SyntaxHighlighter language="python" style={dracula}>
						{`    def get_transaction_status(self, orderNo):
        request_payload = {
          
        "request":{
            "apiRequest": {
            "requestMessageID": self.guid,
            "requestDateTime": self.request_date_time,
            "language": "en-US"
            },
            "advSearchParams":{
                "controllerInternalID":None,
                "officeId":[self.office_id],
                "orderNo":[orderNo],
                "invoiceNo2C2P":None,
                "fromDate":"0001-01-01T00:00:00",
                "toDate":"0001-01-01T00:00:00",
                "amountFrom":None,
                "amountTo":None,
            }
            },
            "iss":self.iss,
            "aud":self.aud,
            "CompanyApiKey":self.company_api_key,
            "iat":self.iat,
            "nbf":self.nbf,
            "exp":self.exp,
            }

        data_to_encrypt = json.dumps(request_payload).encode('utf-8')        
        print(data_to_encrypt)
        encrypted_data= self.encrypt_and_sign_payload(data_to_encrypt)

        return encrypted_data
`}
					</SyntaxHighlighter>
				</div>
				<div className="paragraph">
					Now lets hit the API to check our order
					<SyntaxHighlighter language="python" style={dracula}>
						{`class HBLVerifyView(APIView):
	hbl_payload = HBLGetway()
    base_url = settings.HBL_URL
    accessToken = "you_access_token"
    def get(self, request):
        order_no = request.query_params.get('orderNo')
      
        headers ={
   
            "Accept":"application/json",
            "CompanyApiKey":self.accessToken,
            "Content-Type":"application/jose; charset=utf-8"
        }
        url = self.base_url + "/api/1.0/Inquiry/transactionList"
        payload = self.hbl_payload.get_transaction_status(order_no)
        response  = requests.post(url, data=payload,headers=headers)
        
        data = json.loads(response.content) 
       

        if data["data"][0]["approvalCode"] is not None:
			return Response("Success")
		else:
			return Response("Failed")

					
`}
					</SyntaxHighlighter>
					<br></br>
					In this way you can impmplement HBL payment system in your application.
				</div>
			</React.Fragment>
		),
	};
}

function article_3() {
	return {
		date: "7 May 2023",
		title: "Django and Esewa Payment Integration",
		description:
			"Cloud computing offers a range of benefits, including cost savings and increased flexibility. Find out why more businesses are turning to the cloud.",
		keywords: [
			"Django and Esewa Payment Integration",
			"Rohit",
			"Rohit B",
			"Rohit Bhandari",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: start;
					gap:10px;
				}

				.randImage {
					align-self: center;
					border-radius:10px;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						In this tutorial, we will explore how to integrate the
						eSewa payment gateway into a Django project. By the end,
						you'll have a functioning payment system allowing
						customers to make payments using eSewa.
					</div>
					<div className="paragraph">
						Setting Up the Django Project: Before we dive into the
						payment integration, let's set up our Django project.
						Follow these steps:
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`django-admin startproject mainproject
cd mainproject
python manage.py startapp payment`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						In the 'payment' app, we need to define the models
						required to store order details. Open the
						'payment/models.py' file and add the following code:
						<br></br>
						(Note that we are using a really simple implementation
						of Order model)
					</div>
					<div className="paragraph">
						<SyntaxHighlighter
							language="python"
							style={dracula}
						>
							{`from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=50)
    order_id = models.CharField(max_length=6, null=True, unique=True)
    total_price = models.IntegerField()
    is_paid = models.BooleanField(default=False)
    paid_amount = models.IntegerField(null=True, blank=True)`}
						</SyntaxHighlighter>
					</div>
					<div className="paragraph">
						In this way you can implement the payment getway as your
						application requirement. Feel free to email me if are
						confused in any part.
					</div>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
