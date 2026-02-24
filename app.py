from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        invest = float(request.form.get('invest', 0))
        if invest < 100:
            return jsonify({
                'success': False,
                'message': "Bhai minimum 100 USD toh daal na! 😤"
            })
        
        base_return = invest * 3
        bonus = (invest // 100) * 50
        total = base_return + bonus
        
        return jsonify({
            'success': True,
            'invest': invest,
            'base': base_return,
            'bonus': bonus,
            'total': total,
            'message': f"3x magic ho gaya bhai! Abhi invest kar de warna miss! 🚀"
        })
    except:
        return jsonify({'success': False, 'message': "Kuch galat daala bhai, number daal na!"})

if __name__ == '__main__':
    app.run(debug=True)