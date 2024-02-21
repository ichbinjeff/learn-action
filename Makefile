site:
	@docker run \
		-it --rm \
		--name next_builder \
		-v ${PWD}:/app \
		--platform linux/amd64 \
		-w /app/newco \
		node npm run build


.PHONY:=iac
infra:
	@cd iac/terraform; \
		terraform init -upgrade; \
		terraform apply -auto-approve
			
		
