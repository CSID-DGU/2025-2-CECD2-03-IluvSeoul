from core.action.decorators import *


@action('inquiry')
class InquiryAction:
    @action_method('')
    def upload(self, request):
        self