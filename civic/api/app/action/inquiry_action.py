from core.action.annotation import *


@action('inquiry')
class InquiryAction:
    @action_method
    def upload(self, robj):
        self