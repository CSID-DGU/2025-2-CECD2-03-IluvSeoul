// import axios from 'axios';
// import RestAPI from '../constants/RestAPI';

// Inquiry 에 관한 axios 액션 정의
export default {
    getList() {
        return inquiries;
    },
    getDetail(id) {
        return inquiries.findLast(e => e.id === id)
    }
}

const inquiries = [
    {
        id: 1,
        title: '문의 제목1',
        category: '분류1',
        resolved: true,
        time: '2024-01-10 10:30',
        messages: [
            {
                type: 'inquiry',
                title: '문의 제목1',
                summary: '문의 요약1',
                content: '문의 내용1 -- stt 결과',
                sender: '민원인',
                time: '2024-01-10 10:30'
            },
            {
                type: 'reply',
                content: '답변 내용1',
                sender: '담당자',
                time: '2024-01-10 11:15'
            }
        ],
        attachments: [
            { name: '원본 내용.mp3', size: '234KB' }
        ]
    },
    { id: 2, title: '문의 제목2', category: '분류2', resolved: false, time: '2024-01-11 15:20' },
    { id: 3, title: '문의 제목3', category: '분류1', resolved: true, time: '2024-01-12 09:15' },
    { id: 4, title: '문의 제목4', category: '분류2', resolved: false, time: '2024-01-13 14:45' },
]
